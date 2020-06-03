class Player < ApplicationRecord
  belongs_to :game
  has_one :board
  has_many :moves
  has_many :ships

  def hits
    moves.where(hit: 1).count
  end

  def miss
    moves.where(hit: 0).count
  end

  def sunk
    ships.map{ _1.coordinates if _1.hits == _1.size }.compact
  end
end
