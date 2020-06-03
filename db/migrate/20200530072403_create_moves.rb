class CreateMoves < ActiveRecord::Migration[6.0]
  def change
    create_table :moves do |t|
      t.integer :player_id
      t.integer :x
      t.integer :y
      t.integer :hit

      t.timestamps
    end
  end
end
