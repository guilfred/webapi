import Project from '#models/project';
import { createProjectValidator, getProjectByIDValidator } from '#validators/project_validator';
import { inject } from '@adonisjs/core';
import type { HttpContext } from '@adonisjs/core/http';
import { ProjectDto } from '../dtos/project_dto.js';

@inject()
export default class ProjectController {
  constructor(protected presenter: ProjectDto) {}

  async index({response, auth, bouncer}: HttpContext) {
    const user = auth.user
    if (!user) {
      return response.unauthorized({message: "Requires authentication"})
    }
    await user.load('profile', (profileQuery) => {
      profileQuery.preload('profileCategory')
    })
    if (await bouncer.with('ProjectPolicy').denies('liste')) {
      return response.forbidden({message: 'Authorization denied to list projects'})
    }
    const projects = await Project.query().preload('profileOwner').preload('tickets')

    return projects.map((p: Project) => this.presenter.toJSON(p))
  }

  async store({request, response, auth, bouncer}: HttpContext) {
    const user = auth.user
    if (!user) {
      return response.unauthorized({message: "Requires authentication"})
    }
    await user.load('profile', (profileQuery) => {
      profileQuery.preload('profileCategory')
    })
    if (await bouncer.with('ProjectPolicy').denies('create')) {
      return response.forbidden({message: 'Authorization denied to list projects'})
    }
    const { title, description, profileID} = await request.validateUsing(createProjectValidator)
    const project = new Project()
    project.title = title
    project.description = description
    project.profileID = profileID
    await project.save()
    await project.load('profileOwner')
    
    
    return response.status(201).json(this.presenter.toJSON(project))
  }

  async edit({request, response, auth, bouncer}: HttpContext) {
    const user = auth.user
    if (!user) {
      return response.unauthorized({message: "Requires authentication"})
    }
    await user.load('profile', (profileQuery) => {
      profileQuery.preload('profileCategory')
    })
    if (await bouncer.with('ProjectPolicy').denies('edit')) {
      return response.forbidden({message: 'Authorization denied to list projects'})
    }
    const {params} = await request.validateUsing(getProjectByIDValidator)
    const project = await Project.findOrFail(params.id)
    const { title, description, profileID} = await request.validateUsing(createProjectValidator)
    await project.merge({title, description, profileID}).save()
    await project.load('profileOwner')
    
    
    return response.status(200).json(this.presenter.toJSON(project))
  }

  
}
