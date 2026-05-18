using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System.Text.Json;
using UserService.Models;

namespace UserService.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<UserProfile> UserProfiles => Set<UserProfile>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        var skillComparer = new ValueComparer<List<UserSkill>>(
            (c1, c2) => JsonSerializer.Serialize(c1, (JsonSerializerOptions?)null) ==
                        JsonSerializer.Serialize(c2, (JsonSerializerOptions?)null),
            c => c.Aggregate(0, (a, v) => HashCode.Combine(a, v.Skill.GetHashCode())),
            c => JsonSerializer.Deserialize<List<UserSkill>>(
                JsonSerializer.Serialize(c, (JsonSerializerOptions?)null),
                (JsonSerializerOptions?)null)!
        );

        modelBuilder.Entity<UserProfile>()
            .Property(u => u.SkillsOffered)
            .HasConversion(
                v => JsonSerializer.Serialize(v, (JsonSerializerOptions?)null),
                v => JsonSerializer.Deserialize<List<UserSkill>>(v,
                    (JsonSerializerOptions?)null) ?? new()
            )
            .Metadata.SetValueComparer(skillComparer);

        modelBuilder.Entity<UserProfile>()
            .Property(u => u.SkillsWanted)
            .HasConversion(
                v => JsonSerializer.Serialize(v, (JsonSerializerOptions?)null),
                v => JsonSerializer.Deserialize<List<UserSkill>>(v,
                    (JsonSerializerOptions?)null) ?? new()
            )
            .Metadata.SetValueComparer(skillComparer);
    }
}