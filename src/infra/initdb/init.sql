create table employees (
  id int not null auto_increment,
  name varchar(255) not null,
  createdAt timestamp not null,
  updatedAt timestamp not null,
  primary key (id)
);

create table positions (
  id int not null auto_increment,
  name varchar(255) unique not null,
  createdAt timestamp not null,
  updatedAt timestamp not null,
  primary key (id)
);

create table workShifts (
  id int not null auto_increment,
  startOfTheWorkShift time not null,
  startOfTheBreak time default null,
  endOfTheBreak time default null,
  endOfTheWorkShift time not null,
  createdAt timestamp not null,
  updatedAt timestamp not null,
  primary key (id),
  constraint workingDay unique (
    startOfTheWorkShift,
    startOfTheBreak,
    endOfTheBreak,
    endOfTheWorkShift
  )
);

create table breaks (
  id int not null auto_increment,
  start time not null,
  end time not null,
  createdAt timestamp not null,
  updatedAt timestamp not null,
  primary key (id),
  constraint breakTime unique (start, end)
);

create table itineraries (
  id int not null auto_increment,
  employeeId int not null,
  positionId int not null,
  workShiftId int not null,
  morningBreakId int not null,
  afternoonBreakId int not null,
  createdAt timestamp not null,
  updatedAt timestamp not null,
  primary key (id),
  foreign key (employeeId) references employees(id),
  foreign key (positionId) references positions(id),
  foreign key (workShiftId) references workShifts(id),
  foreign key (morningBreakId) references breaks(id),
  foreign key (afternoonBreakId) references breaks(id),
  constraint itinerary unique (employeeId, positionId, workShiftId, morningBreakId, afternoonBreakId)
);
