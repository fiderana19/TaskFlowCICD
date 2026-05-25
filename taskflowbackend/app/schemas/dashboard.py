from pydantic import BaseModel


class DashboardStats(BaseModel):
    total_tasks: int
    todo_tasks: int
    in_progress_tasks: int
    done_tasks: int
    completion_rate: float
    overdue_tasks: int
