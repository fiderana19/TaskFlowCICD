from datetime import datetime, timedelta, timezone


def test_dashboard_stats_empty(client, auth_headers):
    resp = client.get("/api/dashboard/stats", headers=auth_headers)
    assert resp.status_code == 200
    data = resp.json()
    assert data["total_tasks"] == 0
    assert data["todo_tasks"] == 0
    assert data["in_progress_tasks"] == 0
    assert data["done_tasks"] == 0
    assert data["completion_rate"] == 0.0
    assert data["overdue_tasks"] == 0


def test_dashboard_stats_with_tasks(client, auth_headers, sample_task, db_session):
    from app.models.task import Task

    task2 = Task(title="Done", status="done", user_id=sample_task.user_id)
    db_session.add(task2)
    db_session.commit()

    resp = client.get("/api/dashboard/stats", headers=auth_headers)
    assert resp.status_code == 200
    data = resp.json()
    assert data["total_tasks"] == 2
    assert data["todo_tasks"] == 1
    assert data["done_tasks"] == 1
    assert data["completion_rate"] == 50.0


def test_dashboard_stats_with_overdue(client, auth_headers, db_session, test_user):
    from app.models.task import Task

    overdue = Task(
        title="Overdue Task",
        status="todo",
        due_date=datetime.now(timezone.utc) - timedelta(days=1),
        user_id=test_user.id,
    )
    not_overdue = Task(
        title="Future Task",
        status="todo",
        due_date=datetime.now(timezone.utc) + timedelta(days=1),
        user_id=test_user.id,
    )
    db_session.add_all([overdue, not_overdue])
    db_session.commit()

    resp = client.get("/api/dashboard/stats", headers=auth_headers)
    assert resp.status_code == 200
    data = resp.json()
    assert data["overdue_tasks"] == 1
    assert data["total_tasks"] == 2


def test_dashboard_stats_other_user_isolated(client, auth_headers, auth_headers2, sample_task):
    resp = client.get("/api/dashboard/stats", headers=auth_headers2)
    assert resp.status_code == 200
    data = resp.json()
    assert data["total_tasks"] == 0
