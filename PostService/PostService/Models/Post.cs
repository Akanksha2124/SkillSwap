namespace PostService.Models;

public class Post
{
    public int Id { get; set; }
    public int AuthUserId { get; set; }
    public string UserName { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string SkillOffered { get; set; } = string.Empty;
    public string SkillWanted { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public bool IsActive { get; set; } = true;
}