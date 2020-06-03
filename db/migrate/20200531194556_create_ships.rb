class CreateShips < ActiveRecord::Migration[6.0]
  def change
    create_table :ships do |t|
      t.integer :player_id
      t.integer :size
      t.integer :hits
      t.integer :coordinates, array: true

      t.timestamps
    end
  end
end
