# Project 3 - RenoConnect

![alt text](/README-Assets/product.png)

## Reno-Connect Objective

- Tracking application that helps Users and Contractors to track the different phases of the the renovation works

- Phases have different renovation works stated and timeline input by contractors

- Users will be able to view the schedules and see if renovation is on track

- Users will be alerted and able to approve of work as completed to move on to the next phase of renovation work

## User Stories

Contractor Side

- Contractors will be able to create a user account to use the application.

- Contractors will be able to input company and project details. When done, they are able to click “add” button to create a new project.

- Contractors will be able to view their dashboard after login.

Project Dashboard

- Contractors will be able to see the project timeline, phase details and status of phase.

- Contractors are able to see “Create”, “View/Submit”, “Delete”, “Project Details”, “Dashboard” in page contractor bar to bring them through different pages.

- Contractor Create, View/Submit, Delete Page

- Contractors will be able to click on create to start a new phase in the renovation works.

- Contractors will be able to input phase and renovation details and click append to view a detail card.

- Contractors will be able to click on create button to create new phase. (End for create)

- Contractors will be able to click append to view a detail card.

- Contractors will be able to click on save button to confirm changes. (End for edit)

- Contractors will be able to click on delete to delete a phase.

- Contractors will be able to select which phase they would like to delete.

- Contractors will be able to click remove button to confirm deletion. (End for delete)

Customer Side

- Customers will be able to create a user account to use the application.

- Customers will login via username, password and project id to access dashboard.

- Customers will be able to view renovation schedule and list of tasks when login

- Customers will be able to click on “Approved” button to accept renovation phase if they are satisfied with work.

- Customers will be able to click on “Reject” button to ask contractor to ensure that renovation works are of customer's satisfactory level.

Project Dashboard

- Customers will be able to see the project timeline, phase details and status of phase.

- Contractors are able to see “Project Details”, “Dashboard” in page customer bar to bring them through different pages.

- Customers will see phase details and changeLog that requires approval for changes to the plans made.

- Customers will be able to click “approved” or “reject” for submitted renovation works for review.

## Project Timeline

Planning + Development

- 2+ Weeks

## React Libraries Used

- React Bootstrap
- React Circular Progress Bar
- Modern JavaScript Data Utility Library
- React Google Charts
- Date fns

## Technologies Used

- Mongoose
- Express
- React JS (Vite)
- Node JS
- Javascript

## Project Management

- Kanban board
- Daily standup

## Wireframe

Used Moqups for app wireframing.

https://app.moqups.com/PSwFuPwRdksw3nEwOJuRX85ba32tnIBm/edit/page/a8b49fd9f

## Project Meeting Minutes

#### 6 Sep (Fri) - 9am: Product Launch

- Completion: Product launched.

#### 5 Sep (Thu) - 10am: Daily Standup

- Final polish and refinement of the product.
- Resolved minor integration issues.

#### 3-4 Sep (Tue-Wed) - 10am: Daily Standup

- Team follow-up on tasks.
- Shared individual team members' code contributions.
- Collaborative problem-solving for encountered code issues.
- Integrated and implemented each team member’s code.
- Identified and resolved post-integration issues.

#### 2 Sep (Mon) - 10am: Daily Standup

- Follow-up on team tasks.
- Shared and discussed code from each team member.
- Team collaboration on problem-solving.

#### 30 Aug 2024 (Fri) - 4pm: Project Review

- Major changes implemented:
  - Removed `phaseVersion` for history tracking.
  - Added `changeLog` to track change requests.
  - Included `reviewStatus` in change requests.
  - Embedded `changeLog` in `phase`.
- Aligned on updated data model and logic.
- Updated wireframe, data model, and Express routes.
- Assigned features to team members.
- Identified task schedules and lead times.

#### 30 Aug 2024 (Fri) - 1:30pm: Project Review with Instructor

- Reviewed data model, wireframe, and React/Express routes.
- Rerouted wireframe for project details.
- Updated Phase Lifecycle (PLC) and phase logic.
- Instructor feedback: Major data model changes required.

#### 29 Aug 2024 (Thu) - 1:30pm: Project Review

- Finalized data model and phase logic.
- Implemented `phaseVersion` for version control.
- Confirmed wireframe structure.

#### 27 Aug 2024 (Tue) - 4:30pm: Project Review with Instructor

- Project concept approved.
- Suggested methods to store contractor changes.

#### 26 Aug 2024 (Mon) - 4:30pm: Project Review

- Moved project details to a new route.
- Defined alternative phase status logic.
- New Statuses: Accepted, Rejected (Acceptance/Approval), Submitted for Acceptance/Approval.
- Adjusted login/signup routing for customer and contractor.

#### 25 Aug 2024 (Sun) - 3pm: Project Planning Task Review

- Decided to use data model referencing.
- Added business logic for phase review process (Accepted/NotAccepted).
- Enabled contractor to delete non-accepted phases.
- Updated wireframe and data model.
- Merged data models from team member inputs.

#### 23 Aug 2024 (Fri) - 4pm: Project Kickoff

- Created Trello Kanban Board for project management.
- Assigned project planning tasks to team members.

#### 22 Aug 2024 (Thu) - 12pm: Project Conceptualization

- Defined application stakeholders and solutions.
- Established initial data model.

### References

https://www.style-plus-space.com/the-ultimate-2023-guide-to-hdb-renovation-timeline-and-process/

https://megafurniture.sg/blogs/articles/hdb-renovation-timeline-and-buffer-strategy?srsltid=AfmBOopnpnXCsZSH4oVFaAZcbA8q_woVcIiXda6ILYMltPyPAkACa

How typical renovation phases resembles.
![alt text](/README-Assets/research-phase.png)

### Assets Attribution

https://www.vecteezy.com/free-photos/interior-design
https://www.vecteezy.com/free-photos/living
https://www.vecteezy.com/free-photos/renovation
