class AddCompletionToObjectives < ActiveRecord::Migration[7.0]
  def change
    add_column :objectives, :completion, :integer
  end
end
