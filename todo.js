document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todoForm');
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
    const loadingText = document.getElementById('loadingText');

    // 1. READ: Fetch and display all active tasks from the backend database server
    function loadTasks() {
        fetch('/api/todos')
            .then(res => res.json())
            .then(tasks => {
                loadingText.style.display = 'none';
                taskList.innerHTML = ''; // Wipe list clean before rebuilding

                if (tasks.length === 0) {
                    taskList.innerHTML = `<li style="text-align: center; color: #64748b; padding: 1rem;">No tasks logged yet! Start typing above.</li>`;
                    return;
                }

                tasks.forEach(task => {
                    const li = document.createElement('li');
                    li.style.cssText = "background-color: var(--card-bg); padding: 1rem 1.5rem; border-radius: 6px; border: 1px solid #334155; display: flex; justify-content: space-between; align-items: center; gap: 1rem;";
                    
                    // Render styling dynamically depending on whether task is complete
                    const textDecoration = task.completed ? 'line-through' : 'none';
                    const textColor = task.completed ? '#64748b' : 'white';

                    li.innerHTML = `
                        <span style="text-decoration: ${textDecoration}; color: ${textColor}; font-size: 1.1rem; cursor: pointer; flex: 1;" onclick="toggleTask('${task.id}')">
                            ${task.text}
                        </span>
                        <button onclick="deleteTask('${task.id}')" style="background-color: #ef4444; color: white; border: none; padding: 0.4rem 0.8rem; border-radius: 4px; cursor: pointer; font-weight: bold; font-size: 0.9rem;">Delete</button>
                    `;
                    taskList.appendChild(li);
                });
            });
    }

    // 2. CREATE: Send a new task payload structure to the backend endpoint
    todoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = taskInput.value.trim();

        fetch('/api/todos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text })
        })
        .then(res => res.json())
        .then(() => {
            taskInput.value = ''; // Clean input element box
            loadTasks(); // Refresh client display grid list records
        });
    });

    // 3. UPDATE: Toggle task completion status record
    window.toggleTask = function(id) {
        fetch(`/api/todos/${id}`, { method: 'PUT' })
            .then(res => res.json())
            .then(() => loadTasks());
    };

    // 4. DELETE: Erase task profile entirely from backend array registry
    window.deleteTask = function(id) {
        fetch(`/api/todos/${id}`, { method: 'DELETE' })
            .then(res => res.json())
            .then(() => loadTasks());
    };

    // Initialize list synchronization on mount setup lifecycle
    loadTasks();
});
