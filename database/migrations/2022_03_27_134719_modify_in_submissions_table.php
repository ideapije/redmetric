<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ModifyInSubmissionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (Schema::hasColumn('submissions', 'total_values')) {
            Schema::table('submissions', function (Blueprint $table) {
                $table->dropColumn('total_values');
            });
        }

        if (Schema::hasColumn('submissions', 'total_points')) {
            Schema::table('submissions', function (Blueprint $table) {
                $table->dropColumn('total_points');
            });
        }

        Schema::table('submissions', function (Blueprint $table) {
            $table->decimal('pp', 4, 2)->default(0);
        });
        
        Schema::table('submissions', function (Blueprint $table) {
            $table->decimal('ev', 4, 2)->default(0);
        });
        
        Schema::table('submissions', function (Blueprint $table) {
            $table->decimal('ec', 4, 2)->default(0);
        });
        
        Schema::table('submissions', function (Blueprint $table) {
            $table->decimal('gv', 4, 2)->default(0);
        });
        
        Schema::table('submissions', function (Blueprint $table) {
            $table->decimal('is', 4, 2)->default(0);
        });

        Schema::table('submissions', function (Blueprint $table) {
            $table->decimal('lv', 4, 2)->default(0);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('submissions', function (Blueprint $table) {
            $table->dropColumn('pp');
        });
        
        Schema::table('submissions', function (Blueprint $table) {
            $table->dropColumn('ev');
        });
        
        Schema::table('submissions', function (Blueprint $table) {
            $table->dropColumn('ec');
        });
        
        Schema::table('submissions', function (Blueprint $table) {
            $table->dropColumn('gv');
        });
        
        Schema::table('submissions', function (Blueprint $table) {
            $table->dropColumn('is');
        });

        Schema::table('submissions', function (Blueprint $table) {
            $table->dropColumn('lv');
        });
    }
}
