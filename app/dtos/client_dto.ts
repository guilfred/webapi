import Client from '#models/client'
import Project from '#models/project'
import Ticket from '#models/ticket'

export class ClientDto {
  toJSON(client: Client) {
    return {
      id: client.id,
      fullName: client.fullName,
      rs: client.rs,
      description: client.description,
      address: client.address || null,
      phone: client.phone || null,
      email: client.email || null,
      website: client.website || null,
      codePostal: client.codePostal || null,
      numImmatriculation: client.numImmatriculation || null,
      user: client.user
        ? {
            id: client.user.id,
            email: client.user.email,
            role: client.user.role,
            isEnabled: client.user.isEnabled,
            lastLoginAt: client.user.lastLoginAt || null,
            createdAt: client.user.createdAt,
            updatedAt: client.user.updatedAt || null,
          }
        : null,
      projects: client.projects
        ? client.projects.map((project: Project) => {
            return {
              id: project.id,
              title: project.title,
              description: project.description,
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
          })
        : [],
    }
  }
}
