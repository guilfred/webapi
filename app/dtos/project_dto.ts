import Project from '#models/project'
import Ticket from '#models/ticket'

export class ProjectDto {
  toJSON(project: Project) {
    return {
      id: project.id,
      title: project.title,
      description: project.description,
      profile: project.profileOwner
        ? {
            fullName: project.profileOwner.getFullName(),
            rs: project.profileOwner.rs,
          }
        : null,
      tickets: project.tickets
        ? project.tickets.map((ticket: Ticket) => {
            return {
              id: ticket.id,
              title: ticket.title,
              description: ticket.description,
              provenance: ticket.provenance,
              createdAt: ticket.createdAt,
              priority: ticket.priority,
              status: ticket.status,
            }
          })
        : [],
    }
  }
}
