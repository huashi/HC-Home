class CreateEmails < ActiveRecord::Migration
  def change
    create_table :emails do |t|
      t.string :name
      t.string :phone
      t.text :idea
      t.string :budget
      t.string :source

      t.timestamps null: false
    end
  end
end
