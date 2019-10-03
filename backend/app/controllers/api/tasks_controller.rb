# frozen_string_literal: true

module Api
  class TasksController < Api::ApiController
    def index
      tasks = Task.order(:position)
      render json: { tasks: tasks }
    end

    def create
      task = Task.new(create_params)

      if task.save
        render json: { id: task.id, title: task.title, position: task.position }
      else
        render json: { errors: task.errors }, status: 400
      end
    end

    def destroy
      Task.destroy(params[:id])
      render json: {}
    end

    def update
      Task.update(params[:id], update_params)
      render json: {}
    end

    private

    def create_params
      params.permit(:title)
    end

    def update_params
      params.permit(:title)
    end
  end
end
