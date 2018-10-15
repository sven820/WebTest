<template>
	<div>
		<class-grade-compare class=""></class-grade-compare>
      	<subject-grade-compare class=""></subject-grade-compare>
	</div>
</template>

<script>
import ClassGradeCompare from './ZXReport/ClassGradeCompare'
import SubjectGradeCompare from './ZXReport/SubjectGradeCompare'

export default {

  name: 'App',

  data () {
    return {

    }
  },
  components: {
  	'classGradeCompare': ClassGradeCompare,
    'subjectGradeCompare': SubjectGradeCompare,
  }
}
</script>

<style lang="css" scoped>
</style>