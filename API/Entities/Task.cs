namespace ToDo.Entities
{
    public class Task
    {
        public int Id { get; set; }
        public int TaskListId { get; set; }
        public string TaskName { get; set; } = string.Empty;
        public DateTime DueDate { get; set; }
        public bool IsCompleted { get; set; }
    }
}
