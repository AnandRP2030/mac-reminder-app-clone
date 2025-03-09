let reminders = [];

const TODO_STATUS = {
  ALL_REMINDERS: "All Reminders",
  PENDING : "Pending", 
  COMPLETED: "Completed",
}

const form = document.getElementById("input-form");
const showForm = () => {
  form.classList.remove("hide-element");
  const input = document.getElementById("reminderTitle");
  input.focus();
};

const hideForm = () => {
  form.classList.add("hide-element");
};
function addReminder(e) {
  e.preventDefault();
  const input = document.getElementById("reminderTitle");
  const item = input.value;
  if (!item) {
    return;
  }

  reminders.push({ id: createUniqueId(), item, isCompleted: false });
  input.value = "";
  
  renderReminders();
  renderSectionTitle({
    title: TODO_STATUS.ALL_REMINDERS,
    count: reminders.length
  });
}

function renderReminders(filteredReminders = reminders) {
  const template = document.getElementById("reminder-template").innerHTML;
  const compiled = dust.compile(template, "reminderTemplate");
  dust.loadSource(compiled);
  dust.render(
    "reminderTemplate",
    { reminders: filteredReminders },
    function (err, out) {
      document.getElementById("reminder-list").innerHTML = out;
    }
  );

  renderCounts();
}

const renderCounts = () => {
  const total = reminders.length;
  const completed = reminders.filter((rem) => rem.isCompleted).length;
  const pending = total - completed;
  const data = {
    total,
    completed,
    pending,
  };
  const template = document.getElementById("status-template").innerHTML;
  const compiled = dust.compile(template, "status-template");
  dust.loadSource(compiled);
  dust.render("status-template", data, (err, out) => {
    document.getElementById("status-container").innerHTML = out;
  });
};

const renderSectionTitle = (data) => {
  const template = document.getElementById("active-section-template").innerHTML;
  const compiled = dust.compile(template, 'active-section-template');
  dust.loadSource(compiled);
  dust.render("active-section-template", data, (err, out) => {
    document.getElementById("active-section-header").innerHTML = out;
  })
};

const showAllPendingReminders = () => {
  const pendingReminders = reminders.filter((r) => !r.isCompleted);
  const data = { title: TODO_STATUS.PENDING, count: pendingReminders.length };
  renderReminders(pendingReminders);
  renderSectionTitle(data);
};
const showAllCompletedReminders = () => {
  const completedReminders = reminders.filter((r) => r.isCompleted);
  const data = { title: TODO_STATUS.COMPLETED, count: completedReminders.length };
  renderReminders(completedReminders);
  renderSectionTitle(data)
};
const showAllReminders = () => {
  renderReminders(reminders);
  const data = { title: TODO_STATUS.ALL_REMINDERS, count: reminders.length };
  renderSectionTitle(data);
};

renderReminders();

renderSectionTitle({
  title: TODO_STATUS.ALL_REMINDERS,
  count: reminders.length
});

const filterItems = (e) => {
  const value = e.target.value;

  const filteredItems = reminders.filter((r) =>
    r.item.toLowerCase().includes(value.toLowerCase())
  );
  renderReminders(filteredItems);
};


const createUniqueId = () => {
  return Date.now();
};

const toggleReminder = (checkbox) => {
  const reminderId = parseInt(checkbox.dataset.id, 10);
  const reminder = reminders.find((rem) => rem.id === reminderId);
  reminder.isCompleted = !reminder.isCompleted;
  renderReminders();
  renderSectionTitle({
    title: TODO_STATUS.ALL_REMINDERS,
    count: reminders.length
  });
};

const resetAll = () => {
  reminders = [];
  renderReminders();
  renderSectionTitle({
    title: TODO_STATUS.ALL_REMINDERS,
    count: reminders.length
  });
}
const deleteReminder = (item) => {
  const id = parseInt(item.dataset.id, 10);
  const newReminders = reminders.filter((r) => r.id !== id);
  reminders = [...newReminders];
  renderReminders(newReminders);
  renderSectionTitle({
    title: TODO_STATUS.ALL_REMINDERS,
    count: newReminders.length
  });
}