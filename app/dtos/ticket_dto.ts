import Ticket from '#models/ticket'

export class TicketDto {
  toJSON(ticket: Ticket) {
    return {
      id: ticket.id,
      title: ticket.title,
      description: ticket.description,
      provenance: ticket.provenance,
      createdAt: ticket.createdAt,
      priority: ticket.priority,
      status: ticket.status,
      updatedAt: ticket.updatedAt || null,
      project: ticket.project
        ? {
            id: ticket.project.id,
            title: ticket.project.title,
            description: ticket.project.description,
            client: ticket.project.client
              ? {
                  id: ticket.project.client.id,
                  fullName: ticket.project.client.fullName,
                  rs: ticket.project.client.rs,
                  description: ticket.project.client.description,
                  address: ticket.project.client.address || null,
                  phone: ticket.project.client.phone || null,
                  email: ticket.project.client.email || null,
                  website: ticket.project.client.website || null,
                  codePostal: ticket.project.client.codePostal || null,
                  numImmatriculation: ticket.project.client.numImmatriculation || null,
                }
              : null,
          }
        : null,
    }
  }
}
