namespace :guests do
  desc "Remove guest accounts more than two weeks old."
  task :cleanup => :environment do
    puts "\nDestroying guest accounts older than two weeks..."
    count = User.where(is_guest: true).where("created_at < ?", 2.weeks.ago).destroy_all.count
    puts "\n#{count} accounts destroyed.\n"

    oldest_guest = User.where(is_guest: true).order(:created_at).first
    days_ago = (Time.now - oldest_guest.created_at).to_i / 1.day
    puts "\nNow the oldest guest account was created #{days_ago} days ago:"
    p User.where(is_guest: true).order(:created_at).first
    puts
  end
end
