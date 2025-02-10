// fetch all the employee list and render them
(async function () {
  const data = await fetch("data.json");
  const response = await data.json();
  //   console.log(response);
  let employees = response;
  //bydefault we are showing the first employee info
  let selectedEmployeeId = employees[0].id;
  let selectedEmployee = employees[0];

  //   let selectedEmployeeId;
  //   let selectedEmployee;
  console.log(employees, selectedEmployeeId, selectedEmployee);
  const employeeList = document.querySelector(".employee_names--list");
  const employeeInfo = document.querySelector(".employees_names--info");

  const addEmpBtn = document.querySelector(".addEmpBtn");
  const addEmpModal = document.querySelector(".emp-modal");
  const addEmpForm = document.querySelector(".add-employ");

  addEmpBtn.addEventListener("click", () => {
    addEmpModal.style.display = "flex";
  });

  addEmpModal.addEventListener("click", (e) => {
    if (e.target.className === "emp-modal") {
      addEmpModal.style.display = "none";
    }
  });

  //  employee must be of age greater than 18
  // hence disable the dates in calendar
  const dobInput = document.querySelector(".add-employ--dob");
  dobInput.max = `${new Date().getFullYear() - 18}-${new Date()
    .toISOString()
    .slice(5, 10)}`;
  // new Date() creates a new Date object representing the current date and time.
  // ISO string is "2024-07-02T10:20:30.123Z"
  //   slice(5, 10) returns "07-02".
  console.log(dobInput);
  console.log(dobInput.max);

  addEmpForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(addEmpForm);
    const values = [...formData.entries()];
    console.log(values);
    // convert into json format
    let employeeData = {};
    values.forEach((val) => {
      employeeData[val[0]] = val[1];
    });

    // {firstName: 'shivani', lastName: 'kumari', imageUrl: '', email: 'shivanihgf7@gmail.com', contactNumber: '3423423341', …}
    employeeData.id = employees[employees.length - 1].id + 1;
    employeeData.age =
      new Date().getFullYear() -
      parseInt(employeeData.dateOfBirth.slice(0, 4), 10);

    // gives the current year
    // console.log(new Date().getFullYear());
    // dob: "2024-07-16"
    // console.log(parseInt(employeeData.dob.slice(0, 4), 10));
    // console.log(employeeData.age);

    employeeData.image = employeeData.image || "user.png";
    employees.push(employeeData);
    // console.log(employees);
    // console.log(employeeData);
    renderEmployeeList();
    addEmpForm.reset();
    addEmpModal.style.display = "none";
  });

  employeeList.addEventListener("click", (e) => {
    console.log(e.target);

    if (e.target.tagName === "LI") {
      //   console.log(e.target.id);

      selectedEmployeeId = parseInt(e.target.id);
      selectedEmployee = employees.find((emp) => emp.id === selectedEmployeeId);
      console.log(selectedEmployee, selectedEmployeeId);
      renderEmployeeList();
      renderSingleEmployee();
    }
    if (e.target.tagName === "IMG") {
      //   console.log("Image clicked");
      //   console.log(e.target.parentElement);
      //   console.log(e.target.parentElement.id);
      //   console.log(typeof e.target.parentElement.id); //string
      employees = employees.filter(
        (emp) => String(emp.id) != e.target.parentElement.id
      );
      console.log(employees);
      if (String(selectedEmployeeId) === e.target.parentElement.id) {
        selectedEmployeeId = employees[0]?.id || -1;
        selectedEmployee = employees[0] || {};
        renderSingleEmployee();
      }
      renderEmployeeList();
    }
  });

  const renderEmployeeList = () => {
    employeeList.innerHTML = "";
    const ul = document.createElement("ul");
    employees.forEach((employee) => {
      const li = document.createElement("li");
      li.textContent = `${employee.firstName} ${employee.lastName}`;

      const image = document.createElement("img");
      image.src = "letter-x.png";
      image.classList.add("icon");

      li.setAttribute("id", employee.id);
      li.classList.add("list");

      li.appendChild(image);
      ul.appendChild(li);
      employeeList.appendChild(ul);
      if (parseInt(selectedEmployee.id, 10) === employee.id) {
        console.log(parseInt(selectedEmployee.id, 10) === employee.id);
        li.classList.add("selected");
        selectedEmployee = employee;
      }
    });
  };

  const renderSingleEmployee = () => {
    if (selectedEmployeeId === -1) {
      employeeInfo.innerHTML = "";
      return;
    }
    console.log(selectedEmployee);
    employeeInfo.innerHTML = `
      <img src="${selectedEmployee.image}" class="emp-img"
            "/>
      <p class="emp-name" style="line-height:1.6">${selectedEmployee.firstName} ${selectedEmployee.lastName} (${selectedEmployee.age})</p>
      <p style="line-height:1.6"> ${selectedEmployee.email}</p>
      <p style="line-height:1.6">Mobile Number-${selectedEmployee.contactNumber}</p>
      <p style="line-height:1.6">DOB-${selectedEmployee.dateOfBirth}
      `;
  };
  renderSingleEmployee();
  renderEmployeeList();
})();
