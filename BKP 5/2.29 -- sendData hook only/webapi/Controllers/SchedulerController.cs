using Microsoft.AspNetCore.Mvc;

namespace webapi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SchedulerController : ControllerBase
    {
        [HttpGet("snldata")]
        public ActionResult<IEnumerable<string>> SendSchedulers()
        {
            return Ok(new List<string> { "s1", "s2", "s3" });
        }
    }
}
