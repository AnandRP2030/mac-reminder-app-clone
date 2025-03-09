let reminders = [
  {
    id: 1,
    item: "Buy phone",
    isCompleted: false,
  },
  {
    id: 2,
    item: "Go to gym",
    isCompleted: false,
  },
];

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
}

function renderReminders(filteredReminders = reminders) {
  const template = document.getElementById("reminder-template").innerHTML;
  const compiled = dust.compile(template, "reminderTemplate");
  console.log("filter", filteredReminders);
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

const renderSectionTitle = ({ title, count }) => {
  
};

const showAllPendingReminders = () => {
  const pendingReminders = reminders.filter((r) => !r.isCompleted);
  const data = { title: "Pending", count: pendingReminders.length };
  renderReminders(pendingReminders);
  renderSectionTitle(data);
};
const showAllCompletedReminders = () => {
  console.log('workin')
  const completedReminders = reminders.filter((r) => r.isCompleted);
  const data = { title: "Completed", count: completedReminders.length };
  renderReminders(completedReminders);
  renderSectionTitle(data)
};
const showAllReminders = () => {
  renderReminders(reminders);
  const data = { title: "All Reminders", count: reminders.length };
};

renderReminders();

renderSectionTitle({
  title: "All reminders",
  count: reminders.length
});

const filterItems = (e) => {
  const value = e.target.value;

  const filteredItems = reminders.filter((r) =>
    r.item.toLowerCase().includes(value.toLowerCase())
  );
  renderReminders(filteredItems);
};

const taskCompleted = (i) => {
  reminders[i].isCompleted = true;
  renderReminders();
};

const createUniqueId = () => {
  return Date.now();
};

const toggleReminder = (checkbox) => {
  const reminderId = parseInt(checkbox.dataset.id, 10);
  const reminder = reminders.find((rem) => rem.id === reminderId);
  reminder.isCompleted = !reminder.isCompleted;
  renderReminders();
};
