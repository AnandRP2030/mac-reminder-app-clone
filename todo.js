const dustData = {
  reminders :  [
    {
      item: "Buy phone",
      isCompleted: false,
    },
    {
      item: "Go to gym",
      isCompleted: false,
    },
  ]
}


let {reminders} = dustData;

const allReminders = [
  {
    item: "Buy phone",
    isCompleted: false,
  },
  {
    item: "Go to gym",
    isCompleted: false,
  },
];
function addReminder(e) {
  console.log("ee", e);
  e.preventDefault();
  const input = document.getElementById("reminderTitle");
  const item = input.value;
  if (!item) {
    return;
  }

  reminders.push({ item, isCompleted: false });
  allReminders.push({ item, isCompleted: false });
  input.value = "";
  renderReminders();
}

function renderReminders() {
  const template = document.getElementById("reminder-template").innerHTML;
  const compiled = dust.compile(template, "reminderTemplate");
  dust.loadSource(compiled);
  dust.render("reminderTemplate", { reminders }, function (err, out) {
    document.getElementById("reminder-list").innerHTML = out;
  });

console.log('dust data', dustData)
}

renderReminders();

const filterItems = (e) => {
  const value = e.target.value;

  if (!value) {
    reminders = [...allReminders];
  } else {
    const filteredItems = allReminders.filter((r) =>
      r.item.toLowerCase().includes(value.toLowerCase())
    );
    reminders = [...filteredItems];
  }

  renderReminders();
};
