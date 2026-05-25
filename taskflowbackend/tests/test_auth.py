def test_register_success(client):
    payload = {
        "username": "newuser",
        "email": "newuser@example.com",
        "password": "strongpass123",
    }
    resp = client.post("/api/auth/register", json=payload)
    assert resp.status_code == 201
    data = resp.json()
    assert "access_token" in data
    assert "refresh_token" in data
    assert data["token_type"] == "bearer"


def test_register_duplicate_email(client, test_user):
    payload = {
        "username": "another",
        "email": "test@example.com",
        "password": "strongpass123",
    }
    resp = client.post("/api/auth/register", json=payload)
    assert resp.status_code == 409
    assert "existe déjà" in resp.json()["detail"]


def test_register_duplicate_username(client, test_user):
    payload = {
        "username": "testuser",
        "email": "other@example.com",
        "password": "strongpass123",
    }
    resp = client.post("/api/auth/register", json=payload)
    assert resp.status_code == 409
    assert "déjà pris" in resp.json()["detail"]


def test_register_validation_username_too_short(client):
    payload = {
        "username": "ab",
        "email": "ab@example.com",
        "password": "strongpass123",
    }
    resp = client.post("/api/auth/register", json=payload)
    assert resp.status_code == 422


def test_register_validation_password_too_short(client):
    payload = {
        "username": "validuser",
        "email": "valid@example.com",
        "password": "short",
    }
    resp = client.post("/api/auth/register", json=payload)
    assert resp.status_code == 422


def test_login_success(client, test_user):
    payload = {"email": "test@example.com", "password": "password123"}
    resp = client.post("/api/auth/login", json=payload)
    assert resp.status_code == 200
    data = resp.json()
    assert "access_token" in data
    assert "refresh_token" in data


def test_login_wrong_password(client, test_user):
    payload = {"email": "test@example.com", "password": "wrongpass"}
    resp = client.post("/api/auth/login", json=payload)
    assert resp.status_code == 401
    assert "incorrect" in resp.json()["detail"]


def test_login_wrong_email(client):
    payload = {"email": "nobody@example.com", "password": "password123"}
    resp = client.post("/api/auth/login", json=payload)
    assert resp.status_code == 401


def test_refresh_token(client, test_user, db_session):
    from app.services.auth import create_refresh_token

    refresh = create_refresh_token(test_user.id, db_session)
    resp = client.post("/api/auth/refresh", json={"refresh_token": refresh})
    assert resp.status_code == 200
    data = resp.json()
    assert "access_token" in data
    assert "refresh_token" in data


def test_me_authenticated(client, auth_headers, test_user):
    resp = client.get("/api/auth/me", headers=auth_headers)
    assert resp.status_code == 200
    data = resp.json()
    assert data["email"] == "test@example.com"
    assert data["username"] == "testuser"
    assert "id" in data


def test_me_unauthenticated(client):
    resp = client.get("/api/auth/me")
    assert resp.status_code == 401
