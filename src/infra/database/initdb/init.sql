create table roles (
  roleId int not null auto_increment,
  roleName varchar(255) not null,
  createdAt timestamp not null,
  updatedAt timestamp not null,
  primary key (roleId)
);

create table workingHours (
  workingHourId int not null auto_increment,
  startOfTheWorkingDay time not null,
  startOfLunch time default null,
  endOfLunch time default null,
  endOfTheWorkingDay time not null,
  createdAt timestamp not null,
  updatedAt timestamp not null,
  primary key (workingHourId),
  constraint workingHour unique (
    startOfTheWorkingDay,
    startOfLunch,
    endOfLunch,
    endOfTheWorkingDay
  )
);

create table breakTimes (
  breakTimeId int not null auto_increment,
  start time not null,
  end time not null,
  createdAt timestamp not null,
  updatedAt timestamp not null,
  primary key (breakTimeId),
  constraint breakTime unique (start, end)
);

create table employees (
  employeeId int not null auto_increment,
  employeeName varchar(255) not null,
  roleId int not null,
  createdAt timestamp not null,
  updatedAt timestamp not null,
  primary key (employeeId),
  foreign key (roleId) references roles(roleId)
);

create table itineraries (
  itineraryId int not null auto_increment,
  employeeId int not null,
  workingHourId int not null,
  breakTimeId int not null,
  createdAt timestamp not null,
  updatedAt timestamp not null,
  primary key (itineraryId),
  foreign key (employeeId) references employees(employeeId),
  foreign key (workingHourId) references workingHours(workingHourId),
  foreign key (breakTimeId) references breakTimes(breakTimeId),
  constraint itinerary unique (employeeId, workingHourId, breakTimeId)
);
