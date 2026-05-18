using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PostService.Data;
using PostService.DTOs;
using PostService.Models;

namespace PostService.Controllers;

[ApiController]
[Route("posts")]
public class PostsController : ControllerBase
{
    private readonly AppDbContext _db;

    public PostsController(AppDbContext db)
    {
        _db = db;
    }

    [HttpPost]
    public async Task<IActionResult> CreatePost(CreatePostRequest request)
    {
        var post = new Post
        {
            AuthUserId = request.AuthUserId,
            UserName = request.UserName,
            Title = request.Title,
            Description = request.Description,
            SkillOffered = request.SkillOffered,
            SkillWanted = request.SkillWanted
        };

        _db.Posts.Add(post);
        await _db.SaveChangesAsync();

        return Ok(MapToResponse(post));
    }

    [HttpGet]
    public async Task<IActionResult> GetAllPosts()
    {
        var posts = await _db.Posts
            .Where(p => p.IsActive)
            .OrderByDescending(p => p.CreatedAt)
            .ToListAsync();

        return Ok(posts.Select(MapToResponse));
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetPost(int id)
    {
        var post = await _db.Posts.FindAsync(id);
        if (post == null)
            return NotFound("Post not found.");

        return Ok(MapToResponse(post));
    }

    [HttpGet("user/{authUserId}")]
    public async Task<IActionResult> GetPostsByUser(int authUserId)
    {
        var posts = await _db.Posts
            .Where(p => p.AuthUserId == authUserId && p.IsActive)
            .OrderByDescending(p => p.CreatedAt)
            .ToListAsync();

        return Ok(posts.Select(MapToResponse));
    }

    [HttpGet("search")]
    public async Task<IActionResult> SearchPosts(
        [FromQuery] string? offering,
        [FromQuery] string? wanting)
    {
        var query = _db.Posts.Where(p => p.IsActive);

        if (!string.IsNullOrEmpty(offering))
            query = query.Where(p =>
                p.SkillOffered.ToLower().Contains(offering.ToLower()));

        if (!string.IsNullOrEmpty(wanting))
            query = query.Where(p =>
                p.SkillWanted.ToLower().Contains(wanting.ToLower()));

        var posts = await query
            .OrderByDescending(p => p.CreatedAt)
            .ToListAsync();

        return Ok(posts.Select(MapToResponse));
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeletePost(int id)
    {
        var post = await _db.Posts.FindAsync(id);
        if (post == null)
            return NotFound("Post not found.");

        post.IsActive = false;
        await _db.SaveChangesAsync();

        return Ok("Post deleted successfully.");
    }

    private static PostResponse MapToResponse(Post post) => new()
    {
        Id = post.Id,
        AuthUserId = post.AuthUserId,
        UserName = post.UserName,
        Title = post.Title,
        Description = post.Description,
        SkillOffered = post.SkillOffered,
        SkillWanted = post.SkillWanted,
        CreatedAt = post.CreatedAt,
        IsActive = post.IsActive
    };
}