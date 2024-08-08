create table roles (
  id int not null auto_increment,
  name varchar(255) unique not null,
  createdAt timestamp not null,
  updatedAt timestamp not null,
  primary key (id)
);

create table workingDays (
  id int not null auto_increment,
  startOfTheWorkingDay time not null,
  startOfLunch time default null,
  endOfLunch time default null,
  endOfTheWorkingDay time not null,
  createdAt timestamp not null,
  updatedAt timestamp not null,
  primary key (id),
  constraint workingDay unique (
    startOfTheWorkingDay,
    startOfLunch,
    endOfLunch,
    endOfTheWorkingDay
  )
);

create table breakTimes (
  id int not null auto_increment,
  start time not null,
  end time not null,
  createdAt timestamp not null,
  updatedAt timestamp not null,
  primary key (id),
  constraint breakTime unique (start, end)
);

create table employees (
  id int not null auto_increment,
  name varchar(255) not null,
  roleId int not null,
  createdAt timestamp not null,
  updatedAt timestamp not null,
  primary key (id),
  foreign key (roleId) references roles(id)
);

create table itineraries (
  id int not null auto_increment,
  employeeId int not null,
  workingDayId int not null,
  morningBreakId int not null,
  afternoonBreakId int not null,
  createdAt timestamp not null,
  updatedAt timestamp not null,
  primary key (id),
  foreign key (employeeId) references employees(id),
  foreign key (workingDayId) references workingDays(id),
  foreign key (morningBreakId) references breakTimes(id),
  foreign key (afternoonBreakId) references breakTimes(id),
  constraint itinerary unique (employeeId, workingDayId, morningBreakId, afternoonBreakId)
);
