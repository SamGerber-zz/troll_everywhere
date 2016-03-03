class DeferConstraintsOnOrdForPollsQuestionsResponses < ActiveRecord::Migration
  def up
    execute <<-SQL
      alter table polls
        add constraint deferred_ord_and_author_id unique (author_id, ord)
        DEFERRABLE INITIALLY DEFERRED;
    SQL

    execute <<-SQL
      alter table questions
        add constraint deferred_ord_and_poll_id unique (poll_id, ord)
        DEFERRABLE INITIALLY DEFERRED;
    SQL

    execute <<-SQL
      alter table responses
        add constraint deferred_ord_and_question_id unique (question_id, ord)
        DEFERRABLE INITIALLY DEFERRED;
    SQL
  end

  def down
    execute <<-SQL
      alter table polls
        drop constraint if exists deferred_ord_and_author_id;
    SQL

    execute <<-SQL
      alter table questions
        drop constraint if exists deferred_ord_and_poll_id;
    SQL

    execute <<-SQL
      alter table responses
        drop constraint if exists deferred_ord_and_question_id;
    SQL
  end

end
