using UserService.Models;

namespace UserService.DTOs;

public class CreateProfileRequest
{
    public int AuthUserId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Bio { get; set; } = string.Empty;
    public string ProfilePicture { get; set; } = string.Empty;
    public List<UserSkill> SkillsOffered { get; set; } = new();
    public List<UserSkill> SkillsWanted { get; set; } = new();
}

public class UpdateProfileRequest
{
    public string Bio { get; set; } = string.Empty;
    public string ProfilePicture { get; set; } = string.Empty;
    public List<UserSkill> SkillsOffered { get; set; } = new();
    public List<UserSkill> SkillsWanted { get; set; } = new();
}

public class UserProfileResponse
{
    public int Id { get; set; }
    public int AuthUserId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Bio { get; set; } = string.Empty;
    public string ProfilePicture { get; set; } = string.Empty;
    public List<UserSkill> SkillsOffered { get; set; } = new();
    public List<UserSkill> SkillsWanted { get; set; } = new();
}