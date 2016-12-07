var template = angular.module('template', []);

template.controller('templateCtrl', ['$scope', function($scope) {
	var _qset = null;
	var _scores = [];
	$scope.questions = [];
	$scope.currentQuestion = -1;
	$scope.currentAnswer = { index: -1 };
	$scope.showAnswer = null;
	$scope.result = "";
	$scope.finalScore = -1;
	$scope.title = 'Template';

	$scope.start = function(instance, qset) {
		$scope.title = instance.name;
		$scope.showAnswer = false;
		_qset = qset;
		var ref = _qset.items;
		var question;
		for (var i = 0; i < ref.length; i++) {
			question = ref[i];
			$scope.questions[question.id] = {};
			$scope.questions[question.id].question = question.question[0];
			$scope.questions[question.id].answers = [];
			for(var j = 0; j < question.answers.length; j++) {
				$scope.questions[question.id].answers[j] = question.answers[j];
			}
		}
		Materia.Engine.setHeight();
		$scope.$apply();
	};

	$scope.questionAnswered = function(ques, ans) {
		$scope.result = "";
		for(var i = 0; i < $scope.questions.length; i++) {
			if(ques.text === $scope.questions[i].question.text) {
				$scope.currentQuestion = i;
				break;
			}
		}

		if($scope.currentQuestion > -1) {
			$scope.finalScore = $scope.questions[$scope.currentQuestion].answers[ans].value;
			if($scope.finalScore < 100) {
				$scope.result = "Incorrect!\nScore: " + $scope.finalScore;
			} else {
				$scope.result = "Correct!\nScore: " + $scope.finalScore;
			}
			$scope.showAnswer = true;
		} else {
			$scope.showAnswer = false;
		}
	};

	return Materia.Engine.start($scope);
}]);