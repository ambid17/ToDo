using Microsoft.EntityFrameworkCore;
using ToDo.Entities;
using Task = ToDo.Entities.Task;

namespace ToDo.DbContexts
{
    public class ToDoContext : DbContext
    {
        public DbSet<TaskList> TaskLists { get; set; } = null!;
        public DbSet<Task> Tasks { get; set; } = null!;

        public ToDoContext(DbContextOptions<ToDoContext> options) : base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite("Filename=Todo.db;");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<TaskList>()
                .HasMany(tl => tl.Tasks)
                .WithOne()
                .HasForeignKey(t => t.TaskListId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
