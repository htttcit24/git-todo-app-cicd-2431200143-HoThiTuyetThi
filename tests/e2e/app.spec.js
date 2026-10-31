    const { test, expect, _electron: electron } = require('@playwright/test');

    test('End-to-end user workflow', async () => {
        // Launch the Electron app
        const electronApp = await electron.launch({ args: ['.'] });
        const window = await electronApp.firstWindow();

        const taskText = 'My new E2E test task';

        // --- TODO: Task 1: Add a new todo item ---
        // 1. Find the input field (use a locator like window.locator('#todo-input')).
        const todoInput = window.locator('#todo-input');
        // 2. Type the `taskText` into it.
        await todoInput.fill(taskText);
        // 3. Find and click the "Add" button.
        await window.locator('button:has-text("Add")').click();


        // --- TODO: Task 2: Verify the todo item was added ---
        // 1. Locate the new todo item in the list. A good locator might be `window.locator('.todo-item')`.
        const todoItem = window.locator('.todo-item', {hasText: taskText});
        // 2. Assert that its text content contains the `taskText`.
        await expect(todoItem).toHaveCount(1);
        await expect(todoItem).toContainText(taskText);
        

        // --- TODO: Task 3: Mark the todo item as complete ---
        // 1. Find the checkbox within the new todo item.
        // 2. Click the checkbox.
        const checkBox = todoItem.locator('input[type = "checkbox"]').check();
        // 3. Assert that the todo item now has the 'completed' class.
        await expect(todoItem).toHaveClass(/completed/);


        // --- TODO: Task 4: Delete the todo item ---
        // 1. Find the delete button within the todo item.
        const deleteButton = todoItem.locator('button.delete-btn, button:has-text("Delete")');
        // 2. Click the delete button.
        await deleteButton.click();
        // 3. Assert that the todo item is no longer visible on the page.
        await expect(todoItem).toBeHidden();


        // Close the app
        await electronApp.close();
    });
