class Api::BulkRemovesController < Api::ApiController
  def destroy
    puts params.inspect
  end
end