class Game < ApplicationRecord
  has_many :players
  has_many :boards, through: :players
  has_many :moves, through: :players
  has_one :chat

  validates :boards, length: { maximum: 2 }
  validates :players, length: { maximum: 2 }

  before_create :create_slug
  before_create ->{ build_chat }

  def opponent_of(player)
    players.where.not(id: player.id).first
  end

  def create_slug
    loop do
      self.slug = SecureRandom.hex
      break unless self.class.exists?(slug: slug)
    end
  end
end
