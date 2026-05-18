using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UserService.Data;
using UserService.DTOs;
using UserService.Models;

namespace UserService.Controllers;

[ApiController]
[Route("users")]
public class UsersController : ControllerBase
{
    private readonly AppDbContext _db;

    public UsersController(AppDbContext db)
    {
        _db = db;
    }

    [HttpPost]
    public async Task<IActionResult> CreateProfile(CreateProfileRequest request)
    {
        var existing = await _db.UserProfiles
            .FirstOrDefaultAsync(u => u.AuthUserId == request.AuthUserId);
        if (existing != null)
            return BadRequest("Profile already exists for this user.");

        var profile = new UserProfile
        {
            AuthUserId = request.AuthUserId,
            Name = request.Name,
            Email = request.Email,
            Bio = request.Bio,
            ProfilePicture = request.ProfilePicture,
            SkillsOffered = request.SkillsOffered,
            SkillsWanted = request.SkillsWanted
        };

        _db.UserProfiles.Add(profile);
        await _db.SaveChangesAsync();

        return Ok(MapToResponse(profile));
    }

    [HttpGet("{authUserId}")]
    public async Task<IActionResult> GetProfile(int authUserId)
    {
        var profile = await _db.UserProfiles
            .FirstOrDefaultAsync(u => u.AuthUserId == authUserId);
        if (profile == null)
            return NotFound("Profile not found.");

        return Ok(MapToResponse(profile));
    }

    [HttpPut("{authUserId}")]
    public async Task<IActionResult> UpdateProfile(int authUserId, UpdateProfileRequest request)
    {
        var profile = await _db.UserProfiles
            .FirstOrDefaultAsync(u => u.AuthUserId == authUserId);
        if (profile == null)
            return NotFound("Profile not found.");

        profile.Bio = request.Bio;
        profile.ProfilePicture = request.ProfilePicture;
        profile.SkillsOffered = request.SkillsOffered;
        profile.SkillsWanted = request.SkillsWanted;

        await _db.SaveChangesAsync();
        return Ok(MapToResponse(profile));
    }

    [HttpGet]
    public async Task<IActionResult> GetAllProfiles()
    {
        var profiles = await _db.UserProfiles.ToListAsync();
        return Ok(profiles.Select(MapToResponse));
    }

    [HttpGet("match/{authUserId}")]
public async Task<IActionResult> GetMatches(int authUserId)
{
    var myProfile = await _db.UserProfiles
        .FirstOrDefaultAsync(u => u.AuthUserId == authUserId);
    if (myProfile == null)
        return NotFound("Profile not found.");

    var allProfiles = await _db.UserProfiles
        .Where(u => u.AuthUserId != authUserId)
        .ToListAsync();

    var levelOrder = new Dictionary<string, int>
    {
        { "Beginner", 1 },
        { "Intermediate", 2 },
        { "Advanced", 3 }
    };

    var matches = allProfiles.Where(other =>
        myProfile.SkillsWanted.Any(wanted =>
            other.SkillsOffered.Any(offered =>
                offered.Skill.ToLower() == wanted.Skill.ToLower() &&
                levelOrder.GetValueOrDefault(offered.Level, 0) >=
                levelOrder.GetValueOrDefault(wanted.Level, 0)
            )
        ) &&
        myProfile.SkillsOffered.Any(offered =>
            other.SkillsWanted.Any(wanted =>
                wanted.Skill.ToLower() == offered.Skill.ToLower() &&
                levelOrder.GetValueOrDefault(offered.Level, 0) >=
                levelOrder.GetValueOrDefault(wanted.Level, 0)
            )
        )
    ).Select(MapToResponse).ToList();

    return Ok(matches);
}
    private static UserProfileResponse MapToResponse(UserProfile profile) => new()
    {
        Id = profile.Id,
        AuthUserId = profile.AuthUserId,
        Name = profile.Name,
        Email = profile.Email,
        Bio = profile.Bio,
        ProfilePicture = profile.ProfilePicture,
        SkillsOffered = profile.SkillsOffered,
        SkillsWanted = profile.SkillsWanted
    };
}