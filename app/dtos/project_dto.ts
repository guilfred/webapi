import Project from '#models/project'
import Ticket from '#models/ticket'

export class ProjectDto {
  toJSON(project: Project) {
    return {
      id: project.id,
      title: project.title,
      description: project.description,
      client: project.client
        ? {
            id: project.client.id,
            fullName: project.client.fullName,
            rs: project.client.rs,
            description: project.client.description,
            address: project.client.address || null,
            phone: project.client.phone || null,
            email: project.client.email || null,
            website: project.client.website || null,
            codePostal: project.client.codePostal || null,
            numImmatriculation: project.client.numImmatriculation || null,
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
