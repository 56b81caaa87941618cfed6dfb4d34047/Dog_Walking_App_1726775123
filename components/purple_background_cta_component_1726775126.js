<template>
  <div id="pong-game" style="min-height: 630px" class="max-w-6xl mx-auto px-4 sm:px-6 bg-white">
    <canvas id="pongCanvas" width="800" height="400" class="border border-purple-500 rounded-lg shadow-lg mx-auto"></canvas>
    <div class="text-center mt-4 text-lg text-purple-600">Use W/S keys for left paddle, Up/Down arrow keys for right paddle</div>
  </div>
</template>

<script>
export default {
  name: "PongGameComponent",
  mounted() {
    this.initGame();
  },
  methods: {
    initGame() {
      const canvas = document.getElementById('pongCanvas');
      const ctx = canvas.getContext('2d');
      
      // Game objects
      const ball = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        radius: 10,
        speed: 5,
        dx: 5,
        dy: 5
      };
      
      const paddleHeight = 100;
      const paddleWidth = 10;
      
      const leftPaddle = {
        x: 0,
        y: canvas.height / 2 - paddleHeight / 2,
        width: paddleWidth,
        height: paddleHeight,
        dy: 5
      };
      
      const rightPaddle = {
        x: canvas.width - paddleWidth,
        y: canvas.height / 2 - paddleHeight / 2,
        width: paddleWidth,
        height: paddleHeight,
        dy: 5
      };
      
      // Key states
      const keys = {
        w: false,
        s: false,
        ArrowUp: false,
        ArrowDown: false
      };
      
      // Event listeners for key presses
      document.addEventListener('keydown', (e) => {
        if (e.key in keys) {
          keys[e.key] = true;
        }
      });
      
      document.addEventListener('keyup', (e) => {
        if (e.key in keys) {
          keys[e.key] = false;
        }
      });
      
      // Game loop
      function gameLoop() {
        update();
        draw();
        requestAnimationFrame(gameLoop);
      }
      
      function update() {
        // Move paddles
        if (keys.w && leftPaddle.y > 0) {
          leftPaddle.y -= leftPaddle.dy;
        }
        if (keys.s && leftPaddle.y < canvas.height - leftPaddle.height) {
          leftPaddle.y += leftPaddle.dy;
        }
        if (keys.ArrowUp && rightPaddle.y > 0) {
          rightPaddle.y -= rightPaddle.dy;
        }
        if (keys.ArrowDown && rightPaddle.y < canvas.height - rightPaddle.height) {
          rightPaddle.y += rightPaddle.dy;
        }
        
        // Move ball
        ball.x += ball.dx;
        ball.y += ball.dy;
        
        // Ball collision with top and bottom walls
        if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
          ball.dy *= -1;
        }
        
        // Ball collision with paddles
        if (
          (ball.x - ball.radius < leftPaddle.x + leftPaddle.width && ball.y > leftPaddle.y && ball.y < leftPaddle.y + leftPaddle.height) ||
          (ball.x + ball.radius > rightPaddle.x && ball.y > rightPaddle.y && ball.y < rightPaddle.y + rightPaddle.height)
        ) {
          ball.dx *= -1;
        }
        
        // Reset ball if it goes out of bounds
        if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
          ball.x = canvas.width / 2;
          ball.y = canvas.height / 2;
        }
      }
      
      function draw() {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw paddles
        ctx.fillStyle = '#A855F7';
        ctx.fillRect(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height);
        ctx.fillRect(rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height);
        
        // Draw ball
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#A855F7';
        ctx.fill();
        ctx.closePath();
      }
      
      // Start the game loop
      gameLoop();
    }
  }
};
</script>
