# Mac Reminder App using dust.js

## Overview
This is a simple **Reminder App** built using **HTML, JavaScript, Bootstrap, and Dust.js**. The app allows users to add, delete, filter, and manage their reminders efficiently.

## Features
- **Add Reminders**: Users can add new reminders.
- **Mark as Completed**: Click on the checkbox to mark a reminder as completed.
- **Delete Reminders**: Click the delete button to remove a reminder.
- **Search & Filter**:
  - Search for reminders using the input field.
  - View all, pending, or completed reminders.
- **Reset All**: Clear all reminders with a single click.

## Technologies Used
- **HTML** - Structure the app layout.
- **CSS (Bootstrap 5.3.3)** - Styling and responsive design.
- **JavaScript** - Handles the app's logic and interactivity.
- **Dust.js** - Renders the reminders dynamically.
- **Font Awesome** - Provides icons for UI elements.

## Installation & Usage
### 1. Clone the Repository
```sh
 git clone https://github.com/yourusername/reminder-app.git
```

### 2. Open `index.html`
Simply open `index.html` in any modern browser to use the app.

## File Structure
```
reminder-app/
│── index.html          # Main HTML file
│── todo.js             # JavaScript logic for reminders
│── todo.css            # Custom styles
(icons, fonts, etc.)
```

## Functions & Event Handling
### `addReminder(event)`
- Adds a new reminder and updates the UI.

### `renderReminders(filteredReminders)`
- Renders all reminders dynamically using Dust.js.

### `toggleReminder(checkbox)`
- Toggles the completion status of a reminder.

### `deleteReminder(element)`
- Deletes a specific reminder based on its `id`.

### `resetAll()`
- Clears all reminders.

### `filterItems(event)`
- Filters reminders based on user input.

### `showAllReminders()`
- Displays all reminders.

### `showAllPendingReminders()`
- Displays only pending reminders.

### `showAllCompletedReminders()`
- Displays only completed reminders.
