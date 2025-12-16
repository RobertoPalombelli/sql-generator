# AI-Powered Polyglot Query Generator

An intelligent full-stack application that transforms natural language into executable **SQL** or **MongoDB** queries.

![Java](https://img.shields.io/badge/Java-17%2F21-orange?style=for-the-badge\&logo=openjdk)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x-green?style=for-the-badge\&logo=springboot)
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge\&logo=react)
![LangChain4j](https://img.shields.io/badge/LangChain4j-AI-yellow?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-lightgrey?style=for-the-badge)

---

##  Overview

**AI-Powered Polyglot Query Generator** enables developers, analysts, and data engineers to query heterogeneous databases using plain natural language.

The application:

* Feeds structural context to an LLM
* Produces optimized, dialect-aware queries

No ORM. No static schemas. No vendor lock-in.

---

## Key Features

* ** Natural Language to Code**
  Convert requests such as:

  > *"Show me users from Rome who spent more than 500 euros"*
  > into valid, optimized **SQL** or **MongoDB Aggregation Pipelines**.


* ** Conversational Memory**

  * Session-based chat context
  * Follow-up queries supported ("now filter by date")
  * UUID-based memory isolation per session

* ** Polyglot Query Generation**

  * SQL dialect adaptation per database
  * MongoDB aggregation support when NoSQL is selected
---

## Tech Stack

### Backend

* **Framework:** Spring Boot 3.x
* **Language:** Java 17 
* **AI Integration:** LangChain4j
* **LLM Provider:** GitHub Models (GPT-4o)

### Frontend

* **Framework:** React 19
* **HTTP Client:** Native `fetch`
* **State Management:** React Hooks
* **Session Tracking:** UUID-based chat context

---


## Getting Started

### Prerequisites

* Java **17** or **21**
* Node.js **18+**
* npm
* GitHub Personal Access Token (for GitHub Models access)

---

## Backend Setup

### 1. Clone the Repository

```bash
git clone https://github.com/RobertoPalombelli/sql-generator
cd /Backend
```

### 2. Configure Application Properties

Edit `src/main/resources/application.properties` or export environment variables.

```properties
# GitHub Models (OpenAI-compatible API)
github.configuration.token=GITHUB_TOKEN
```

### 3. Build and Run

```bash
mvn clean install
mvn spring-boot:run
```

The backend will start on:

```
http://localhost:8686
```

---

##  Frontend Setup

### 1. Navigate to Frontend

```bash
cd ../Frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Application

```bash
npm start
```

The UI will be available at:

```
http://localhost:3000
```

---

<img width="789" height="874" alt="image" src="https://github.com/user-attachments/assets/d831e83e-9f3b-43f5-bf01-d2ab83532e20" />


## How to Use

1. **Select Database Dialect**
   Choose between MySQL, PostgreSQL, Oracle, or MongoDB.

3. **Ask a Question**
   Example:

   > "Calculate the average salary per department"

4. **Review the Output**

   * Generated query
   * Short technical explanation
   * Dialect-specific optimizations

---

##  Roadmap & Future Enhancements

### 1. RAG for Large Schemas

Addresses context window limits in enterprise databases.

**Strategy:**

* Vectorize table and column metadata
* Semantic search for top-N relevant tables
* Inject only relevant schema into the LLM prompt

**Benefits:**

* Lower token usage
* Reduced hallucinations
* Faster responses

---

### 2.  Auto-Charting & Visualization

* LLM returns both query and visualization metadata
* Example output:

```json
{
  "chartType": "BAR",
  "xAxis": "department",
  "yAxis": "avg_salary"
}
```

* Frontend renders charts using Recharts or Chart.js

---

### 3. Data Export

* Export query results
* Supported formats:

  * Excel (Apache POI)
  * CSV (Apache Commons CSV)
* Streaming ResultSet for large datasets

---


##  Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Submit a Pull Request

---

