---
title: "MySQL backup/restore task for Capistrano"
date: 2007-11-20T10:59:41+00:00
updated: 2007-11-20T18:07:56+00:00
url: /blog/2007/11/20/mysql-backup-restore-task-for-capistrano/
draft: false
comments: 0
---

This is a simple backup task for <a href="http://www.capify.org/">Capistrano</a> (which could really use a lot more documentation...).

The tool reads database configuration from the local database.yml. This Works For Me (tm) as I keep the local and remote database configuration identical - YMMV.

While the script doesn't require you to type the database user's password, it will echo it to the console for the restore task. Avoiding that seems to be quite tricky - I tried sending the backup directly over the stream and piping in the password before, but that gives an obscure error.

So the following will have to do for now, but I'm quite pleased with it. I should probably include a warning/confirmation before restoring, but hey, command lines are for experts ;-)

<pre class="prettyprint">$config = YAML.load_file(File.join('config', 'database.yml'))

desc "Backup the database to db/" + Time.now.strftime("backup_#{$config['production']['database']}_%Y-%m-%e.sql")
task :backup, :roles => :db, :only => { :primary => true } do 
  backup_path = File.join('db', Time.now.strftime("backup_#{$config['production']['database']}_%Y-%m-%e.sql"))
  on_rollback { delete backup_path, :recursive => false }
  backup_file = File.new(backup_path, 'w+')
  run "mysqldump --default-character-set=utf8 " +
    "--user=#{$config['production']['username']} " +
    "--password " +
    "-B #{$config['production']['database']}" do |channel,stream,data|
    if stream == :out
      backup_file.write(data)
    else
      if data =~ /^Enter password:/
        channel.send_data($config['production']['password'])
        channel.send_data("\\n")
      else
        raise Capistrano::Error, "unexpected output from mysqldump: " + data
      end
    end
  end
  logger.info "Database dumped to #{backup_path} successfully."
end

desc "Restore the database from backup"
task :restore, :roles => :db do
  backups = Dir[File.join('db', "backup_#{$config['production']['database']}_*.sql")]
  raise Capistrano::Error, "no backup found!" if backups.size == 0
  last_backup = backups.sort[-1]
  put(File.read(last_backup), "#{current_path}/db/restore.sql")
  logger.info "Restoring from #{last_backup}"
  run "mysql --default-character-set=utf8 " +
    "--user=#{$config['production']['username']} " +
    "--password=#{$config['production']['password']} " do |channel, stream, data|
    raise Capistrano::Error, "unexpected output from mysql: " + data
  end
  logger.info "Restored successfully."
end
</pre>
