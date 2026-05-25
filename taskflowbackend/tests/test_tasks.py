def test_create_task(client, auth_headers):
    payload = {"title": "New Task", "description": "Task description"}
    resp = client.post("/api/tasks", json=payload, headers=auth_headers)
    assert resp.status_code == 201
    data = resp.json()
    assert data["title"] == "New Task"
    assert data["status"] == "todo"
    assert "id" in data


def test_create_task_validation_empty_title(client, auth_headers):
    payload = {"title": "   "}
    resp = client.post("/api/tasks", json=payload, headers=auth_headers)
    assert resp.status_code == 422


def test_list_tasks(client, auth_headers, sample_task):
    resp = client.get("/api/tasks", headers=auth_headers)
    assert resp.status_code == 200
    data = resp.json()
    assert data["total"] >= 1
    assert len(data["items"]) >= 1
    assert data["page"] == 1
    assert data["size"] == 10


def test_list_tasks_pagination(client, auth_headers, sample_task):
    resp = client.get("/api/tasks?page=1&size=5", headers=auth_headers)
    assert resp.status_code == 200
    data = resp.json()
    assert data["size"] == 5


def test_list_tasks_filter_status(client, auth_headers, sample_task, db_session):
    from app.models.task import Task

    task2 = Task(title="Done Task", status="done", user_id=sample_task.user_id)
    db_session.add(task2)
    db_session.commit()

    resp = client.get("/api/tasks?status=done", headers=auth_headers)
    assert resp.status_code == 200
    data = resp.json()
    assert all(t["status"] == "done" for t in data["items"])


def test_list_tasks_search(client, auth_headers, sample_task):
    resp = client.get("/api/tasks?search=Test", headers=auth_headers)
    assert resp.status_code == 200
    data = resp.json()
    assert len(data["items"]) >= 1


def test_get_task(client, auth_headers, sample_task):
    resp = client.get(f"/api/tasks/{sample_task.id}", headers=auth_headers)
    assert resp.status_code == 200
    data = resp.json()
    assert data["id"] == sample_task.id
    assert data["title"] == sample_task.title


def test_get_task_not_found(client, auth_headers):
    resp = client.get("/api/tasks/99999", headers=auth_headers)
    assert resp.status_code == 404


def test_get_task_other_user(client, auth_headers, sample_task, auth_headers2):
    resp = client.get(f"/api/tasks/{sample_task.id}", headers=auth_headers2)
    assert resp.status_code == 404


def test_update_task(client, auth_headers, sample_task):
    payload = {"title": "Updated Title"}
    resp = client.put(f"/api/tasks/{sample_task.id}", json=payload, headers=auth_headers)
    assert resp.status_code == 200
    data = resp.json()
    assert data["title"] == "Updated Title"


def test_update_task_other_user(client, auth_headers2, sample_task):
    payload = {"title": "Hacked"}
    resp = client.put(f"/api/tasks/{sample_task.id}", json=payload, headers=auth_headers2)
    assert resp.status_code == 404


def test_update_task_status(client, auth_headers, sample_task):
    payload = {"status": "in_progress"}
    resp = client.patch(f"/api/tasks/{sample_task.id}/status", json=payload, headers=auth_headers)
    assert resp.status_code == 200
    data = resp.json()
    assert data["status"] == "in_progress"


def test_update_task_status_invalid(client, auth_headers, sample_task):
    payload = {"status": "invalid_status"}
    resp = client.patch(f"/api/tasks/{sample_task.id}/status", json=payload, headers=auth_headers)
    assert resp.status_code == 422


def test_delete_task(client, auth_headers, sample_task):
    resp = client.delete(f"/api/tasks/{sample_task.id}", headers=auth_headers)
    assert resp.status_code == 204


def test_delete_task_other_user(client, auth_headers2, sample_task):
    resp = client.delete(f"/api/tasks/{sample_task.id}", headers=auth_headers2)
    assert resp.status_code == 404


def test_unauthorized_access(client):
    resp = client.get("/api/tasks")
    assert resp.status_code == 401
