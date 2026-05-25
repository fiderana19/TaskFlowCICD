from datetime import datetime, timezone

from sqlalchemy import func
from sqlalchemy.orm import Session

from app.models.task import Task, TaskStatus
from app.schemas.task import TaskCreate, TaskUpdate


def list_tasks(
    db: Session,
    user_id: int,
    page: int = 1,
    size: int = 10,
    status: str | None = None,
    search: str | None = None,
):
    query = db.query(Task).filter(Task.user_id == user_id)

    if status:
        query = query.filter(Task.status == status)

    if search:
        query = query.filter(Task.title.ilike(f"%{search}%"))

    total = query.count()
    pages = max(1, (total + size - 1) // size)

    items = (
        query.order_by(Task.created_at.desc())
        .offset((page - 1) * size)
        .limit(size)
        .all()
    )

    return items, total, page, size, pages


def get_task(db: Session, task_id: int, user_id: int) -> Task | None:
    return db.query(Task).filter(Task.id == task_id, Task.user_id == user_id).first()


def create_task(db: Session, user_id: int, data: TaskCreate) -> Task:
    status = data.status if data.status else TaskStatus.TODO.value
    task = Task(
        title=data.title,
        description=data.description,
        status=status,
        due_date=data.due_date,
        user_id=user_id,
    )
    db.add(task)
    db.commit()
    db.refresh(task)
    return task


def update_task(db: Session, task: Task, data: TaskUpdate) -> Task:
    update_data = data.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(task, key, value)
    task.updated_at = datetime.now(timezone.utc)
    db.commit()
    db.refresh(task)
    return task


def delete_task(db: Session, task: Task) -> None:
    db.delete(task)
    db.commit()


def update_task_status(db: Session, task: Task, new_status: str) -> Task:
    task.status = new_status
    task.updated_at = datetime.now(timezone.utc)
    db.commit()
    db.refresh(task)
    return task
