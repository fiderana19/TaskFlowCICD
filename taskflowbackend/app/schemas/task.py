from datetime import datetime

from pydantic import BaseModel, field_validator


class TaskStatusUpdate(BaseModel):
    status: str

    @field_validator("status")
    @classmethod
    def validate_status(cls, v: str) -> str:
        allowed = {"todo", "in_progress", "done"}
        if v not in allowed:
            raise ValueError(f"Le statut doit être l'un des suivants : {', '.join(sorted(allowed))}")
        return v


class TaskCreate(BaseModel):
    title: str
    description: str | None = None
    status: str | None = None
    due_date: datetime | None = None

    @field_validator("title")
    @classmethod
    def validate_title(cls, v: str) -> str:
        v = v.strip()
        if not v:
            raise ValueError("Le titre ne peut pas être vide")
        if len(v) > 255:
            raise ValueError("Le titre ne peut pas dépasser 255 caractères")
        return v

    @field_validator("description")
    @classmethod
    def validate_description(cls, v: str | None) -> str | None:
        if v is not None and len(v) > 5000:
            raise ValueError("La description ne peut pas dépasser 5000 caractères")
        return v

    @field_validator("status")
    @classmethod
    def validate_status_create(cls, v: str | None) -> str | None:
        if v is not None:
            allowed = {"todo", "in_progress", "done"}
            if v not in allowed:
                raise ValueError(f"Le statut doit être l'un des suivants : {', '.join(sorted(allowed))}")
        return v


class TaskUpdate(BaseModel):
    title: str | None = None
    description: str | None = None
    status: str | None = None
    due_date: datetime | None = None

    @field_validator("title")
    @classmethod
    def validate_title(cls, v: str | None) -> str | None:
        if v is not None:
            v = v.strip()
            if not v:
                raise ValueError("Le titre ne peut pas être vide")
            if len(v) > 255:
                raise ValueError("Le titre ne peut pas dépasser 255 caractères")
        return v

    @field_validator("description")
    @classmethod
    def validate_description(cls, v: str | None) -> str | None:
        if v is not None and len(v) > 5000:
            raise ValueError("La description ne peut pas dépasser 5000 caractères")
        return v

    @field_validator("status")
    @classmethod
    def validate_status_update(cls, v: str | None) -> str | None:
        if v is not None:
            allowed = {"todo", "in_progress", "done"}
            if v not in allowed:
                raise ValueError(f"Le statut doit être l'un des suivants : {', '.join(sorted(allowed))}")
        return v


class TaskOut(BaseModel):
    id: int
    title: str
    description: str | None
    status: str
    due_date: str | None
    created_at: str
    updated_at: str
    user_id: int

    model_config = {"from_attributes": True}


class PaginatedResponse(BaseModel):
    items: list
    total: int
    page: int
    size: int
    pages: int
