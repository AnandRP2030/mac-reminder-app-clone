const dustData = {
  reminders: [
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
  ],
};

let { reminders } = dustData;


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
 console.log('filter', filteredReminders)
  dust.loadSource(compiled);
  dust.render(
    "reminderTemplate",
    { reminders: filteredReminders },
    function (err, out) {
      document.getElementById("reminder-list").innerHTML = out;
    }
  );
}

const showAllPendingReminders = () => {
  const pendingReminders = reminders.filter((r) => !r.isCompleted);
  renderReminders(pendingReminders)
}
const showAllCompletedReminders = () => {
  const completedReminders = reminders.filter((r) => r.isCompleted);
  console.log('comp', completedReminders)
  renderReminders(completedReminders)
}
const showAllReminders = () => {
  renderReminders(reminders)
}

renderReminders();

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
}
