class CreateObjectives < ActiveRecord::Migration[7.0]
  def change
    create_table :objectives do |t|
      t.string :title
      t.decimal :weights
      t.timestamps
    end
  end
end
