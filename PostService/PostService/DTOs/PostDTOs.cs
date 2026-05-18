namespace PostService.DTOs;

public class CreatePostRequest
{
    public int AuthUserId { get; set; }
    public string UserName { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string SkillOffered { get; set; } = string.Empty;
    public string SkillWanted { get; set; } = string.Empty;
}

public class PostResponse
{
    public int Id { get; set; }
    public int AuthUserId { get; set; }
    public string UserName { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string SkillOffered { get; set; } = string.Empty;
    public string SkillWanted { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
    public bool IsActive { get; set; }
}