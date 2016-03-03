namespace :guests do
  desc "Remove guest accounts more than two weeks old."
  task :cleanup => :environment do
    User.where(is_guest: true).where("created_at < ?", 2.weeks.ago).destroy_all
  end
end
