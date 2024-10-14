create table employees (
  id int not null auto_increment,
  name varchar(255) not null,
  createdAt timestamp default current_timestamp on update current_timestamp,
  updatedAt timestamp default current_timestamp on update current_timestamp,
  primary key (id)
);

create table positions (
  id int not null auto_increment,
  name varchar(255) unique not null,
  createdAt timestamp default current_timestamp on update current_timestamp,
  updatedAt timestamp default current_timestamp on update current_timestamp,
  primary key (id)
);

create table workShifts (
  id int not null auto_increment,
  startTime time not null,
  startLunch time default null,
  endLunch time default null,
  endTime time not null,
  createdAt timestamp default current_timestamp on update current_timestamp,
  updatedAt timestamp default current_timestamp on update current_timestamp,
  primary key (id),
  constraint workingDay unique (
    startTime,
    startLunch,
    endLunch,
    endTime
  )
);

create table breaks (
  id int not null auto_increment,
  startTime time not null,
  endTime time not null,
  createdAt timestamp default current_timestamp on update current_timestamp,
  updatedAt timestamp default current_timestamp on update current_timestamp,
  primary key (id),
  constraint breakTime unique (startTime, endTime)
);

create table itineraries (
  id int not null auto_increment,
  employeeId int not null,
  positionId int not null,
  workShiftId int not null,
  morningBreakId int default null,
  afternoonBreakId int default null,
  createdAt timestamp default current_timestamp on update current_timestamp,
  updatedAt timestamp default current_timestamp on update current_timestamp,
  primary key (id),
  foreign key (employeeId) references employees(id),
  foreign key (positionId) references positions(id),
  foreign key (workShiftId) references workShifts(id),
  foreign key (morningBreakId) references breaks(id),
  foreign key (afternoonBreakId) references breaks(id),
  constraint itinerary unique (employeeId, positionId, workShiftId, morningBreakId, afternoonBreakId)
);
