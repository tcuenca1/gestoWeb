import os
import yaml
from dotenv import load_dotenv
from crewai import Agent, Task, Crew, LLM

# Cargar variables de entorno desde .env
load_dotenv()

# Configurar el modelo LLM con Gemini 3.5 Flash Lite
gemini_api_key = os.getenv("GEMINI_API_KEY")
model_name = os.getenv("MODEL", "gemini-3.5-flash-lite")

# Inicializar LLM para CrewAI (usando el proveedor gemini o litellm compatible)
llm = LLM(
    model=f"gemini/{model_name}",
    api_key=gemini_api_key
)

# Cargar configuración de agentes desde agents.yaml
config_path = os.path.join(os.path.dirname(__file__), "config", "agents.yaml")
with open(config_path, "r", encoding="utf-8") as f:
    agents_config = yaml.safe_load(f)

# Instanciar Agentes basados en el YAML
arquitecto = Agent(
    role=agents_config["arquitecto"]["role"],
    goal=agents_config["arquitecto"]["goal"],
    backstory=agents_config["arquitecto"]["backstory"],
    llm=llm,
    verbose=True
)

dev_backend = Agent(
    role=agents_config["dev_backend"]["role"],
    goal=agents_config["dev_backend"]["goal"],
    backstory=agents_config["dev_backend"]["backstory"],
    llm=llm,
    verbose=True
)

dev_frontend = Agent(
    role=agents_config["dev_frontend"]["role"],
    goal=agents_config["dev_frontend"]["goal"],
    backstory=agents_config["dev_frontend"]["backstory"],
    llm=llm,
    verbose=True
)

qa = Agent(
    role=agents_config["qa"]["role"],
    goal=agents_config["qa"]["goal"],
    backstory=agents_config["qa"]["backstory"],
    llm=llm,
    verbose=True
)

# Definir tareas iniciales de ejemplo para el ecosistema
tarea_auditoria = Task(
    description="Auditar la estructura hexagonal inicial del proyecto GestoWeb y verificar el cumplimiento del SRS.",
    expected_output="Informe de arquitectura y validación de directorios.",
    agent=arquitecto
)

# Instanciar el Crew con verbose=True
crew = Crew(
    agents=[arquitecto, dev_backend, dev_frontend, qa],
    tasks=[tarea_auditoria],
    verbose=True
)

if __name__ == "__main__":
    print("=== Ecosistema de Agentes GestoWeb Inicializado ===")
    print(f"Modelo LLM activo: {model_name}")
    # result = crew.kickoff()
    # print(result)
