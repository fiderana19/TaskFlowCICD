from datetime import datetime, timezone

from sqlalchemy import func
from sqlalchemy.orm import Session

from app.models.task import Task, TaskStatus


def get_dashboard_stats(db: Session, user_id: int) -> dict:
    total = db.query(func.count(Task.id)).filter(Task.user_id == user_id).scalar() or 0
    todo = (
        db.query(func.count(Task.id))
        .filter(Task.user_id == user_id, Task.status == TaskStatus.TODO.value)
        .scalar()
        or 0
    )
    in_progress = (
        db.query(func.count(Task.id))
        .filter(Task.user_id == user_id, Task.status == TaskStatus.IN_PROGRESS.value)
        .scalar()
        or 0
    )
    done = (
        db.query(func.count(Task.id))
        .filter(Task.user_id == user_id, Task.status == TaskStatus.DONE.value)
        .scalar()
        or 0
    )
    overdue = (
        db.query(func.count(Task.id))
        .filter(
            Task.user_id == user_id,
            Task.due_date < datetime.now(timezone.utc),
            Task.status != TaskStatus.DONE.value,
        )
        .scalar()
        or 0
    )

    completion_rate = round(done / total * 100, 1) if total > 0 else 0.0

    return {
        "total_tasks": total,
        "todo_tasks": todo,
        "in_progress_tasks": in_progress,
        "done_tasks": done,
        "completion_rate": completion_rate,
        "overdue_tasks": overdue,
    }
