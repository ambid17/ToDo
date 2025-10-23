using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using ToDo.DbContexts;
using ToDo.Entities;

namespace ToDo.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TaskController : ControllerBase
    {

        private readonly ILogger<TaskController> _logger;
        private readonly ToDoContext _toDoContext;

        public TaskController(ILogger<TaskController> logger, ToDoContext toDoContext)
        {
            _logger = logger;
            _toDoContext = toDoContext;
        }

        [HttpGet]
        [Route("TaskLists")]
        public async Task<IEnumerable<TaskList>> GetTaskLists()
        {
            return await _toDoContext.TaskLists
                .Include(tl => tl.Tasks)
                .ToListAsync();
        }

        [HttpPost]
        [Route("TaskList")]
        public async Task<IActionResult> CreateTaskList([FromBody] TaskList taskList)
        {
            _toDoContext.TaskLists.Add(taskList);
            await _toDoContext.SaveChangesAsync();
            return CreatedAtAction(nameof(GetTaskLists), new { id = taskList.Id }, taskList);
        }

        [HttpPost]
        [Route("Task")]
        public async Task<IActionResult> CreateTask([FromBody] Entities.Task task)
        {
            _toDoContext.Tasks.Add(task);
            await _toDoContext.SaveChangesAsync();
            return CreatedAtAction(nameof(GetTaskLists), new { id = task.Id }, task);
        }

        [HttpDelete]
        [Route("TaskList/{taskListId}")]
        public async Task<IActionResult> DeleteTaskList(int taskListId)
        {
            var taskList = await _toDoContext.TaskLists.FirstOrDefaultAsync(taskList => taskList.Id == taskListId);
            if (taskList == null)
            {
                return NotFound();
            }
            _toDoContext.TaskLists.Remove(taskList);
            await _toDoContext.SaveChangesAsync();
            return NoContent();
        }

        [HttpPut]
        [Route("TaskList")]
        public async Task<IActionResult> UpdateTaskList([FromBody] TaskList taskList)
        {
            var existingTaskList = await _toDoContext.TaskLists.FirstOrDefaultAsync(tl => tl.Id == taskList.Id);
            if (existingTaskList == null)
            {
                return NotFound();
            }
            existingTaskList.Name = taskList.Name;
            await _toDoContext.SaveChangesAsync();
            return NoContent();
        }
    }
}
